import { useState } from "react";

type ModalType = "create" | "edit" | "details";

export const useModals = <TUuid = string>() => {
	const [openModals, setOpenModals] = useState<Record<ModalType, boolean>>({
		create: false,
		edit: false,
		details: false,
	});
	const [selectedUuid, setSelectedUuid] = useState<TUuid | null>(null);

	const openModal = (type: ModalType, uuid?: TUuid) => {
		if (uuid) setSelectedUuid(uuid);
		setOpenModals((prev) => ({ ...prev, [type]: true }));
	};

	const closeModal = (type: ModalType) => {
		setOpenModals((prev) => ({ ...prev, [type]: false }));
		if (type !== "create") setSelectedUuid(null);
	};

	return {
		isCreateOpen: openModals.create,
		isEditOpen: openModals.edit,
		isDetailsOpen: openModals.details,
		selectedUuid,

		openCreate: () => openModal("create"),
		openEdit: (uuid: TUuid) => openModal("edit", uuid),
		openDetails: (uuid: TUuid) => openModal("details", uuid),
		closeCreate: () => closeModal("create"),
		closeEdit: () => closeModal("edit"),
		closeDetails: () => closeModal("details"),
	};
};
